import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  IconButton,
  Skeleton,
  MenuItem,
  Select,
  Button
} from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { toast } from 'react-toastify'; // Mocking toast or just alert if not installed

const ContactInlineFilter = ({ onClose, onApply, initialRules = [], p = 1, fields = [] }) => {
  const [property, setProperty] = useState(null);
  const [rules, setRules] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [, setIsApplied] = useState(() => initialRules?.length > 0);
  const [appliedRules, setAppliedRules] = useState([]);

  const hasChanged = (() => {
    if (rules.length !== appliedRules.length) return true;
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].field?.name !== appliedRules[i].field?.name) return true;
      if (rules[i].operator !== appliedRules[i].operator) return true;
      if (rules[i].value !== appliedRules[i].value) return true;
    }
    return false;
  })();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!fields?.length) return;

    if (!initialRules?.length) {
      setRules([]);
      setAppliedRules([]);
      setIsApplied(false);
      return;
    }

    const formattedRules = initialRules
      .map(rule => {
        const fullField = fields.find(f => f.name === rule.field);
        if (!fullField) return null;

        const validOperator = rule.operator || fullField.operators?.[0]?.value || '';

        let finalValue = rule.value ?? '';

        if (Array.isArray(fullField.value) && rule.value !== undefined) {
          if (Array.isArray(rule.value)) {
            finalValue = rule.value.filter(val => fullField.value.some(v => v.value === val));
          } else {
            const matchedOption = fullField.value.find(v => v.value === rule.value);
            finalValue = matchedOption?.value ?? '';
          }
        }

        return {
          field: fullField,
          operator: validOperator,
          value: finalValue,
        };
      })
      .filter(Boolean);

    setRules(formattedRules);
    setAppliedRules(formattedRules);
    setIsApplied(true);
  }, [initialRules, fields]);

  const handleSelect = (_, val) => {
    if (!val) return;

    if (rules?.length >= 5) {
      alert('Only 5 filters can be applied at a time'); // Replace toast with alert
      setProperty(null);
      return;
    }

    const fullField = fields.find(f => f.name === val.value);
    if (!fullField) return;

    setRules(prev => [
      ...prev,
      {
        field: fullField,
        operator: fullField.operators?.[0]?.value || '',
        value: '',
      },
    ]);

    setInputValue('');
    setProperty(null);
  };

  const handleOperatorChange = (index, operator) => {
    setRules(prev =>
      prev.map((rule, i) => (i === index ? { ...rule, operator, value: '' } : rule))
    );
  };

  const handleValueChange = (index, value) => {
    setRules(prev => prev.map((rule, i) => (i === index ? { ...rule, value } : rule)));
  };

  const handleRemove = index => {
    setRules(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
        <IconButton onClick={onClose} size="small">
          <KeyboardArrowLeftRoundedIcon sx={{ color: 'primary.main' }} />
        </IconButton>
        <Typography variant="h6">Filter Contacts</Typography>
      </Box>

      {/* Property Select */}
      <Box sx={{ mx: 1 }}>
        <Autocomplete
          options={fields
            .filter(f => !rules?.some(rule => rule.field.name === f.name))
            .map(f => ({ label: f.label, value: f.name }))}
          value={property}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={handleSelect}
          getOptionLabel={option => option?.label || ''}
          isOptionEqualToValue={(option, value) => option?.value === value?.value}
          renderInput={params => (
            <TextField {...params} inputRef={inputRef} size="small" placeholder="Choose property" />
          )}
        />
      </Box>

      {/* Rules */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', mt: 1 }}>
        {loading ? (
          <Box sx={{ p: 1 }}>
            <Skeleton width={120} height={20} />
            <Stack spacing={1} mt={1}>
              <Skeleton height={30} />
              <Skeleton height={30} />
            </Stack>
          </Box>
        ) : (
          <Box
            sx={{
              borderTop: rules?.length ? '2px solid #E9EDF5' : 'none',
            }}
          >
            {rules.map((rule, index) => {
              const isEmptyOperator =
                rule.operator === 'is_empty' || rule.operator === 'is_not_empty';

              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    alignItems: 'center',
                    p: 1,
                    borderBottom: '1px solid #E9EDF5',
                    '&:hover': {
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  {/* Label */}
                  <Typography sx={{ minWidth: 200 }}>{rule.field?.label}</Typography>

                  {/* Remove */}
                  <Box sx={{ ml: 4 }}>
                    <IconButton size="small" onClick={() => handleRemove(index)} color="error">
                      <CloseRoundedIcon fontSize="small" sx={{ color: 'error.main' }} />
                    </IconButton>
                  </Box>

                  {/* Operator */}
                  <Select
                    size="small"
                    value={rule.operator}
                    onChange={e => handleOperatorChange(index, e.target.value)}
                    sx={{
                      minWidth: 90,
                      height: 30,
                      '& .MuiSelect-select': {
                        py: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                      },
                    }}
                  >
                    {rule.field.operators.map(op => (
                      <MenuItem key={op.value} value={op.value}>
                        {op.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {/* Value Section */}
                  {(() => {
                    const selectedOp = rule.field.operators?.find(op => op.value === rule.operator);
                    const currentType = selectedOp?.type;

                    if (currentType === 'none' || isEmptyOperator) return null;

                    if (
                      currentType === 'select' ||
                      currentType === 'boolean' ||
                      currentType === 'date_select'
                    ) {
                      return (
                        <Select
                          size="small"
                          value={rule.value ?? ''}
                          onChange={e => handleValueChange(index, e.target.value)}
                          sx={{
                            minWidth: 180,
                            height: 30,
                            bgcolor: '#FAFDFF',
                            '& .MuiSelect-select': {
                              py: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%',
                              boxSizing: 'border-box',
                            },
                          }}
                        >
                          {Array.isArray(rule.field.value) &&
                            rule.field.value.map(v => (
                              <MenuItem key={String(v.value)} value={v.value}>
                                {v.label}
                              </MenuItem>
                            ))}
                        </Select>
                      );
                    }

                    if (currentType === 'multi_select') {
                      return (
                        <Select
                          size="small"
                          multiple
                          value={Array.isArray(rule.value) ? rule.value : []}
                          onChange={e => handleValueChange(index, e.target.value)}
                          sx={{
                            minWidth: 180,
                            height: 30,
                            bgcolor: '#FAFDFF',
                            '& .MuiSelect-select': {
                              py: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: '100%',
                              boxSizing: 'border-box',
                            },
                          }}
                        >
                          {Array.isArray(rule.field.value) &&
                            rule.field.value.map(v => (
                              <MenuItem key={String(v.value)} value={v.value}>
                                {v.label}
                              </MenuItem>
                            ))}
                        </Select>
                      );
                    }

                    if (currentType === 'number') {
                      return (
                        <TextField
                          size="small"
                          type="number"
                          value={rule.value || ''}
                          onChange={e => handleValueChange(index, e.target.value)}
                          sx={{ '& .MuiInputBase-root': { height: 30 } }}
                        />
                      );
                    }

                    if (currentType === 'date') {
                      return (
                        <TextField
                          size="small"
                          type="date"
                          value={rule.value || ''}
                          onChange={e => handleValueChange(index, e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          sx={{ '& .MuiInputBase-root': { height: 30 } }}
                        />
                      );
                    }

                    return (
                      <TextField
                        size="small"
                        value={rule.value || ''}
                        onChange={e => handleValueChange(index, e.target.value)}
                        sx={{ '& .MuiInputBase-root': { height: 30 } }}
                      />
                    );
                  })()}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 'auto',
          pt: 1.5,
          pb: 1.5,
          px: 1.5,
          borderTop: '1px solid #ebeaf2',
          flexShrink: 0,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            disabled={!hasChanged}
            fullWidth
            onClick={() => {
              const cleanedRules = rules.map(rule => ({
                ...rule,
                value: typeof rule.value === 'string' ? rule.value.trim() : rule.value,
              }));

              const hasEmptyValue = cleanedRules.some(rule => {
                const isEmptyOperator =
                  rule.operator === 'is_empty' || rule.operator === 'is_not_empty';
                return (
                  !isEmptyOperator &&
                  (rule.value === '' || rule.value === null || rule.value === undefined)
                );
              });

              if (hasEmptyValue) {
                alert('Please enter a valid value for all filters'); // Replace toast
                return;
              }

              onApply(cleanedRules);
              setAppliedRules(cleanedRules);
              setIsApplied(true);
            }}
            sx={{ borderRadius: 10, height: 34, width: 100 }}
          >
            Apply Filter
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              if (rules?.length || appliedRules?.length) {
                setRules([]);
                setAppliedRules([]);
                onApply([]);
                setIsApplied(false);
              } else {
                onClose();
              }
            }}
            sx={{ borderRadius: 10, height: 34, width: 100 }}
          >
            {rules?.length || appliedRules?.length ? 'Clear' : 'Close'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ContactInlineFilter;
