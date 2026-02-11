import AddField from '@/components/Dashboard/AddField';
import FieldsFilter from '@/components/Dashboard/FieldsFilter';
import Table from '@/components/Dashboard/Table';
import { Plus, Funnel, SearchIcon } from 'lucide-react';
import { useState } from 'react';

const mockFields = [
  {
    id: 1,
    ownerName: 'Остап Сидоряк',
    size: '12.5 ha',
    address: 'Львівська обл., с. Сокільники',
    soil: 'Чорнозем',
    crop: 'Пшениця',
  },
  {
    id: 2,
    ownerName: 'Іван Петренко',
    size: '5.2 ha',
    address: 'Тернопільська обл., м. Збараж',
    soil: 'Піщаний',
    crop: 'Кукурудза',
  },
  {
    id: 3,
    ownerName: 'Марія Коваль',
    size: '20.0 ha',
    address: 'Київська обл., м. Буча',
    soil: 'Суглинок',
    crop: 'Соняшник',
  },
  {
    id: 4,
    ownerName: 'Андрій Шевченко',
    size: '45.8 ha',
    address: 'Полтавська обл., с. Решетилівка',
    soil: 'Типовий чорнозем',
    crop: 'Рапс',
  },
  {
    id: 5,
    ownerName: 'Олена Бондар',
    size: '8.3 ha',
    address: 'Вінницька обл., м. Жмеринка',
    soil: 'Сірий лісовий',
    crop: 'Ячмінь',
  },
  {
    id: 6,
    ownerName: 'Віктор Павлик',
    size: '100.0 ha',
    address: 'Одеська обл., м. Білгород-Дністровський',
    soil: 'Каштановий',
    crop: 'Виноград',
  },
  {
    id: 7,
    ownerName: 'Дмитро Козак',
    size: '15.4 ha',
    address: 'Черкаська обл., с. Мошни',
    soil: 'Опідзолений чорнозем',
    crop: 'Соя',
  },
  {
    id: 8,
    ownerName: 'Наталія Савченко',
    size: '3.7 ha',
    address: 'Закарпатська обл., м. Мукачево',
    soil: 'Бурозем',
    crop: 'Картопля',
  },
  {
    id: 9,
    ownerName: 'Сергій Ткаченко',
    size: '62.1 ha',
    address: 'Дніпропетровська обл., с. Слобожанське',
    soil: 'Звичайний чорнозем',
    crop: 'Цукровий буряк',
  },
  {
    id: 10,
    ownerName: 'Юлія Мороз',
    size: '11.0 ha',
    address: 'Харківська обл., м. Чугуїв',
    soil: 'Солонцюватий',
    crop: 'Жито',
  },
  {
    id: 11,
    ownerName: 'Олександр Кравченко',
    size: '27.4 ha',
    address: 'Херсонська обл., м. Каховка',
    soil: 'Темно-каштановий',
    crop: 'Кавун',
  },
  {
    id: 12,
    ownerName: 'Тетяна Лисенко',
    size: '18.9 ha',
    address: 'Чернігівська обл., с. Козелець',
    soil: 'Дерново-підзолистий',
    crop: 'Овес',
  },
];

const Fields = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [addField, setAddField] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchedFields = mockFields.filter(field => {
    const query = searchQuery.toLowerCase();
    return (
      field.ownerName.toLowerCase().includes(query) ||
      field.address.toLowerCase().includes(query) ||
      field.crop.toLowerCase().includes(query) ||
      field.soil.toLowerCase().includes(query)
    );
  });

  return (
    <div className="px-5 py-6">
      <div className="flex flex-col gap-1 mb-5">
        <h3 className="text-primary text-3xl font-bold">Field Management</h3>
        <p className="text-gray-400 text-base">
          Simplify processes and build trust through traceability
        </p>
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-md border border-gray-200 px-2 py-2 w-80 bg-white">
            <SearchIcon className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 outline-none border-none w-full text-gray-400 text-base"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="border rounded-lg bg-white border-gray-200 px-4 py-2 text-black flex items-center gap-2 font-medium cursor-pointer text-base transition-colors hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100"
          >
            <Funnel className="text-black" size={18} />
            Filters
          </button>
        </div>
        <button
          onClick={() => setAddField(true)}
          className="bg-primary  hover:bg-primary-dark flex items-center px-4 py-2 text-white gap-2 text-base rounded-lg cursor-pointer font-medium"
        >
          <Plus size={22} className="text-white" /> Add Field
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold ">
          {searchQuery.length > 0 ? searchedFields.length : mockFields.length} Fields
        </h3>
        <Table maxRows={6} data={searchQuery.length > 0 ? searchedFields : mockFields} />
      </div>
      {showFilter && <FieldsFilter setOpen={setShowFilter} />}
      {addField && <AddField setOpen={setAddField} />}
    </div>
  );
};

export default Fields;
