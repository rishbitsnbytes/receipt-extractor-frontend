import { useEffect, useState } from 'react';
import { Container, Stack, Text, useMantineTheme } from '@mantine/core';
import { DropzoneButton } from '../components';
import { FilePreview } from '../components'
import { Loader } from '../components';
import { ExtractionResult } from '../components';
import { notifications } from '@mantine/notifications';
import { commonNotificationStyles, getErrorNotificationStyles } from '../../styles/commonStyles';
import type { ExtractionData } from '../types';

type ExtractionStep = 'select' | 'preview' | 'loading' | 'result' | 'error';

export function ReceiptExtraction(): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<ExtractionStep>('select');
  const [result, setResult] = useState<ExtractionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useMantineTheme();

  // Handle file selection
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStep('preview');
    setError(null);
  };

  // Handle file removal
  const handleRemove = () => {
    setFile(null);
    setStep('select');
    setError(null);
  };

  // Handle extract action (simulate API call)
  const handleExtract = async () => {
    setStep('loading');
    setError(null);
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      setTimeout(() => {
        // const sampleNullData: ExtractionData = {
        //   imageUrl: file ? URL.createObjectURL(file) : '',
        //   date: null,
        //   currency: null,
        //   vendor: null,
        //   items: [],
        //   tax: null,
        //   total: null,
        // }
        const sampleMockData: ExtractionData = {
          imageUrl: file ? URL.createObjectURL(file) : '',
          date: '2025-06-13',
          currency: 'USD',
          vendor: 'Sample Vendor',
          items: [
            { name: 'Item 1', cost: '$ 10' },
            { name: 'Item 2', cost: '$ 20' },
            { name: 'Item 3', cost: '$ 3' },
            { name: 'Item 4', cost: '$ 0' },
            { name: 'Item 5', cost: '$ 0' },
          ],
          tax: 60,
          total: 33,
        }

        setResult(sampleMockData);
        setStep('result');
      }, 2000);
    } catch (err: unknown) {
      setError('Extraction failed!');
      setStep('error');
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Unknown error');
      }
    }
  };

  // Restart flow
  const handleRestart = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setStep('select');
  };

  // Show error notification if error occurs
  useEffect(() => {
    if (error) {
      notifications.show({
        title: 'File upload error',
        message: error,
        ...commonNotificationStyles,
        ...getErrorNotificationStyles(theme),
      });
    }
  }, [error, theme]);

  return (
    <Container size="md" p="xl">
      <Stack align="center" gap="xl" px='md'>
        <Stack align="center" gap="md" my='xl'>
          <Text fw={900} size="2.5rem" ta="center" >
            Receipt Extractor
          </Text>
          <Text ta="center" c="dimmed" size="lg" px="xl" maw={'70%'}>
            Upload a receipt image to extract details like vendor, date, currency, items, taxand total cost.
          </Text>
        </Stack>
        {step === 'select' ? <DropzoneButton setFile={handleFileSelect} /> : null}
        {step === 'preview' && file ? (
          <FilePreview file={file} onRemove={handleRemove} onExtract={handleExtract} />
        ) : null}
        {step === 'loading' ? <Loader /> : null}
        {((step === 'result' || step === 'error') && result) ? (
          <ExtractionResult data={result} onRestart={handleRestart} error={error ?? undefined} />
        ) : null}
        {(step === 'error' && !result) ? (
          <ExtractionResult data={{
            imageUrl: '',
            date: '',
            currency: '',
            vendor: '',
            items: [],
            total: 0,
          }} onRestart={handleRestart} error={error ?? 'Unknown error'} />
        ) : null}
      </Stack>
    </Container>
  );
}