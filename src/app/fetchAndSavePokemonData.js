// C:\Users\pavel.kuplensky\pokeprojectv2\src\app\fetchAndSavePokemonData.js
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25');
    const data = await response.json();
    const pokemons = data.results;

    const pokemonPromises = pokemons.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      if (pokemonData) {
        console.log(pokemonData.name); // Выводим имя покемона в консоль

        const pokemonRecord = await prisma.pokemon.upsert({
          where: { name: pokemonData.name },
          update: {},
          create: {
            name: pokemonData.name,
            weight: pokemonData.weight,
            height: pokemonData.height,
            species: pokemonData.species.name,
            experience: pokemonData.base_experience
          },
        });

        const abilityPromises = pokemonData.abilities.map(async (abilityRef) => {
          const abilityRecord = await prisma.ability.upsert({
            where: { name: abilityRef.ability.name },
            update: {},
            create: { name: abilityRef.ability.name },
          });

          await prisma.pokemonAbility.upsert({
            where: {
              pokemonId_abilityId: {
                pokemonId: pokemonRecord.id,
                abilityId: abilityRecord.id
              }
            },
            update: {},
            create: {
              pokemonId: pokemonRecord.id,
              abilityId: abilityRecord.id
            }
          });
        });

        await Promise.all(abilityPromises);
        console.log(`Успешно добавлен покемон ${pokemonData.name} и его способности.`);
      }
    });

    await Promise.all(pokemonPromises);
    console.log('Все операции успешно завершены.');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchPokemonData();