import { Card, Group, Text, Button, Stack, Image } from '@mantine/core';
import React from 'react';

type FilePreviewProps = {
  file: File;
  onRemove: () => void;
  onExtract: () => void;
};

export function FilePreview({ file, onRemove, onExtract }: FilePreviewProps) {
  const { name, size } = file;
  const extension = name.split('.').pop();

  const imageUrl = URL.createObjectURL(file);

  // Revoke the object URL when the component unmounts or file changes
  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={500}>
      <Stack align="center" gap="sm">
        <Image
          src={imageUrl}
          alt={name}
          radius="md"
          maw={400}
          mah={400}
          fit="contain"
        />
        <Text fw={700}>File Name: {name}</Text>
        <Text size="sm" c="dimmed">
          Extension: <b>{extension}</b> | Size: <b>{(size / 1024).toFixed(2)} KB</b>
        </Text>
        <Group justify="center" mt="md" w='100%'>
          <Button variant="outline" color="red" onClick={onRemove}>
            Cancel
          </Button>
          <Button onClick={onExtract}>Extract</Button>
        </Group>
      </Stack>
    </Card>
  );
}