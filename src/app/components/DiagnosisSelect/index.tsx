import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

type Option = { code: string; name: string };

type DiagnosisSelectProps = {
  label?: string;
  placeholder?: string;
  onSelect: (option?: Option) => void;
  debounceTime?: number;
};

const DIAGNOSES_API_URL = 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search';

export default function DiagnosisSelect({
  placeholder = 'Search diagnoses...',
  onSelect,
  debounceTime = 300,
}: DiagnosisSelectProps) {
  const [term, setTerm] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!term.trim()) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams({
        terms: term,
        sf: 'code,name',
        df: 'code,name',
        maxList: '10',
      });

      fetch(`${DIAGNOSES_API_URL}?${params}`)
        .then((res) => res.json())
        .then((data) => {
          const codes: string[] = data[1] || [];
          const names: string[][] = data[3] || [];
          const opts: Option[] = codes.map((code, idx) => ({
            code,
            name: names[idx]?.[1] || '',
          }));
          setOptions(opts);
        })
        .catch((err) => {
          console.error('DiagnosisSelect fetch error:', err);
          setOptions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [term, debounceTime]);

  return (
    <Select
        showSearch
        searchValue={term}
        onSearch={setTerm}
        placeholder={placeholder}
        loading={loading}
        optionFilterProp="name"
        fieldNames={{ label: 'name', value: 'code' }}
        onChange={(_, option) => onSelect(option as Option )}
        options={options}
    />
  );
}
