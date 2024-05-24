// C:\Users\pavel.kuplensky\pokeprojectv2\src\app\pokemons\page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import FilterAndSort from '@/components/FilterAndSort';
import Pagination from '@/components/Pagination';
import PokemonList from '@/components/PokemonList';
import PokemonForm from '@/components/PokemonForm';
import { usePokemonActions } from '../../../pages/api/PokemonActions';
import { Button, buttonVariants } from '@/components/ui/button';

const PokemonsPage = () => {
  const {
    pokemons,
    selectedDetail,
    newPokemon,
    updatingPokemon,
    fetchPokemons,
    handleDetailsClick,
    handleDeleteClick,
    handleSubmitClick,
    handleUpdateSubmit,
    handleUpdateClick,
    handleSortChange,
    handleFilterTypeChange,
    handleFilterValueChange,
    sortedAndFilteredPokemons,
    handleUpdateInputChange,
    handleInputChange,
    showForm, 
    handleCreateClick,
    currentPage,
    itemsPerPage,
    previousPage,
    nextPage, 
  } = usePokemonActions();

  return (
    <div>
      
      <FilterAndSort 
        handleSortChange={handleSortChange} 
        handleFilterTypeChange={handleFilterTypeChange}
        handleFilterValueChange={handleFilterValueChange}
      />
      <PokemonList
        pokemons={sortedAndFilteredPokemons}
        handleDeleteClick={handleDeleteClick}
        handleDetailsClick={handleDetailsClick}
        handleUpdateSubmit={handleUpdateSubmit}
        handleUpdateClick={handleUpdateClick}
        handleUpdateInputChange={handleUpdateInputChange}
        selectedDetail={selectedDetail}
        updatingPokemon={updatingPokemon}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(sortedAndFilteredPokemons.length / itemsPerPage)}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <PokemonForm
       handleSubmitClick={handleSubmitClick}
       handleInputChange={handleInputChange}
       handleCreateClick={handleCreateClick}
       newPokemon={newPokemon}
       showForm={showForm} 
      />
      <Button variant="black">Херов тейлвинд, рот его ебал</Button> 

    </div>
  );
};

export default PokemonsPage;
