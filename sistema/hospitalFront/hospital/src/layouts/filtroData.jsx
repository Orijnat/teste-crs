"use client";

export default function FiltroData({ value, onDataChange }) {
  const { dataI, dataF } = value;

  const handleChange = (e) => {
    const { name, value: selectedValue } = e.target;

    onDataChange({
      dataI: name === "dataI" ? selectedValue : dataI,
      dataF: name === "dataF" ? selectedValue : dataF,
    });
  };

  return (
    <form className="flex items-center space-x-4">
      <div>
        <label htmlFor="dataI" className="block text-sm font-medium text-gray-700">
          Data Início
        </label>
        <input
          type="date"
          id="dataI"
          name="dataI"
          value={dataI}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="dataF" className="block text-sm font-medium text-gray-700">
          Data Fim
        </label>
        <input
          type="date"
          id="dataF"
          name="dataF"
          value={dataF}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </form>
  );
}