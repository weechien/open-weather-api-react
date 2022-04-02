import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import { SearchIcon } from '../Icon';
import { Input } from '../Input';

const StyledSearchInput = styled(Input)``;

interface SearchInputProps<T> {
  searchableData?: Array<T>;
  searchableKeys?: Array<keyof T | string>;
  placeholder?: string;
  onSearch?: (data: Array<T> | string) => void;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput = <T,>({
  searchableData,
  searchableKeys,
  placeholder,
  onSearch,
  searchText,
  setSearchText,
  ...props
}: SearchInputProps<T>) => {
  useEffect(() => {
    const filteredData =
      searchableData?.filter((item) => {
        const matches = searchableKeys?.find((key) => {
          const text = get(item, key);
          if (typeof text === 'string') {
            return text.toLowerCase().includes(searchText.toLowerCase());
          }
          return false;
        });
        return !!matches;
      }) || searchText;
    filteredData && onSearch?.(filteredData);
  }, [searchText]);

  return (
    <StyledSearchInput
      value={searchText}
      placeholder={placeholder}
      Icon={SearchIcon}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
      {...props}
    />
  );
};
