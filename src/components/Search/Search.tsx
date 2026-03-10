import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="flex items-center rounded-md border border-gray-300 px-2 py-1.5 w-80">
      <SearchIcon className="text-gray-400" size={24} />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 outline-none border-none w-32 md:w-64"
      />

      <div className="flex items-center gap-1.5 text-sm">
        <div className="rounded-md border border-gray-400 w-8 h-7 text-gray-400 flex items-center justify-center text-center px-1">
          Ctr
        </div>
        <div className="rounded-md border border-gray-400 w-8 h-7 text-gray-400 text-center flex items-center justify-center px-1">
          F
        </div>
      </div>
    </div>
  );
};

export default Search;
