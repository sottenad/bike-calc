'use client';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  suffix,
  min,
  max,
  step = 1,
  placeholder
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex">
        <input
          type="number"
          id={id}
          value={value || ''}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        {suffix && (
          <span className="rounded-r-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-600 min-w-[3rem] text-center">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// Variant without suffix for inline use
interface SimpleNumberInputProps {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  suffix: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export function SimpleNumberInput({
  id,
  label,
  value,
  onChange,
  suffix,
  min,
  max,
  step = 0.1,
  placeholder
}: SimpleNumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(null);
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex">
        <input
          type="number"
          id={id}
          value={value ?? ''}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="flex-1 rounded-l-lg border border-r-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <span className="rounded-r-lg border border-gray-300 px-3 py-2 bg-gray-50 text-gray-600">
          {suffix}
        </span>
      </div>
    </div>
  );
}
