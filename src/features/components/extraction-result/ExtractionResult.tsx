import { Card, Stack, Text, Button, ScrollArea, Image, Group, Divider, Box, Flex, Grid, Tooltip } from '@mantine/core';
import { IconZoomExclamation } from '@tabler/icons-react';
import type { ExtractionData } from '../../types';

interface ExtractionResultProps {
  data: ExtractionData;
  onRestart: () => void;
  error?: string;
}

// Component to display a message when data is missing
function Missing({ label }: { label: string }) {
  return (
    <Tooltip
      label={`${label} are not present or could not be extracted. Try with clearer image`}
      withArrow
      multiline
      w={300}
      color="red"
    >
      <Flex align="center" gap={4}>
        <IconZoomExclamation color="red" size={18} />
        <Text c="red" size="sm">{label}</Text>
      </Flex>
    </Tooltip>
  );
}

export function ExtractionResult({ data, onRestart, error }: ExtractionResultProps) {
  // Early return for error state
  if (error) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder maw={500}>
        <Stack align="center" gap="md">
          <Text c="red" fw={700}>Error: {error}</Text>
          <Button onClick={onRestart}>Start New Extraction</Button>
        </Stack>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={900} w="100%">
      <Grid gutter="md" align="space-between" justify="space-between" w={{ base: '95%', sm: '100%' }}>
        {/* Left: Receipt Image */}
        <Grid.Col span={{ base: 12, sm: 5.5 }}>
          <Box w="100%">
            <Image
              src={data.imageUrl}
              alt="Receipt"
              radius="md"
              maw={400}
              mah={400}
              fit="contain"
              mx="auto"
              style={{ border: '1px solid #e0e0e0' }}
            />
          </Box>
        </Grid.Col>
        {/* Right: Details */}
        <Grid.Col span={{ base: 12, sm: 5.5 }}>
          <ScrollArea mx='auto' h={400} w="100%" miw={'150'} maw={500} mt={{ base: 20, sm: 0 }} type="auto" scrollbarSize={8} offsetScrollbars>
            <Stack gap="xs" pr={15} pl={5}>
              <Group justify="space-between">
                {data.vendor && data.vendor.trim() !== '' ? (
                  <Text fw={700} size="xl">{data.vendor}</Text>
                ) : (
                  <Missing label="Vendor" />
                )}
              </Group>
              <Group justify="space-between">
                {data.date && data.date.trim() !== '' ? (
                  <Text>{data.date}</Text>
                ) : (
                  <Missing label="Date" />
                )}
              </Group>
              <Group justify="space-between">
                {data.currency && data.currency.trim() !== '' ? (
                  <Text>{data.currency}</Text>
                ) : (
                  <Missing label="Currency" />
                )}
              </Group>
              <Divider />
              <Stack gap={4}>
                {Array.isArray(data.items) && data.items.length > 0 ? (
                  data.items.map((item, idx) => (
                    <Flex key={idx} justify="space-between" align="center" gap="sm" py={3}>
                      <Box>
                        {item.name && item.name.trim() !== '' ? (
                          <Text fw={500}>{item.name}</Text>
                        ) : (
                          <Missing label="Item name" />
                        )}
                      </Box>
                      {item.cost ? (
                        <Text>{data.currency ?? ''} {item.cost}</Text>
                      ) : (
                        <Missing label="Item cost" />
                      )}
                    </Flex>
                  ))
                ) : (
                  <Missing label="Items" />
                )}
              </Stack>
              <Divider />
              {data.tax && typeof data.tax === 'number' && !isNaN(data.tax) ? (
                <>
                  <Group justify="space-between">
                    <Text>GST/Tax</Text>
                    <Text>{data.currency ?? ''} {data.tax}</Text>
                  </Group>
                  <Divider />
                </>
              ) : (
                <Missing label="GST/Tax" />
              )}
              <Group justify="space-between">
                {data.total && typeof data.total === 'number' && !isNaN(data.total) ? (
                  <Group justify='space-between' w="100%">
                    <Text fw={700}>Total</Text>
                    <Text fw={700}>{data.currency ?? ''} {data.total}</Text>
                  </Group>
                ) : (
                  <Missing label="Total" />
                )}
              </Group>
            </Stack>
          </ScrollArea>
        </Grid.Col>
      </Grid>
      <Flex justify="end" w={'100%'} mt="lg">
        <Button variant="outline" w="fit-content" onClick={onRestart}>
          Start New Extraction
        </Button>
      </Flex>
    </Card >
  );
}