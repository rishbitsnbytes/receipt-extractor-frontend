import { useRef, useState } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { Button, Group, Text, useMantineTheme, Alert } from '@mantine/core';
import { Dropzone, MIME_TYPES, DropzoneProps } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';
import { notifications } from '@mantine/notifications';

const IMAGE_MIME_TYPES = [MIME_TYPES.png, MIME_TYPES.jpeg, 'image/jpg'];

type DropzoneButtonProps = {
  setFile?: (file: File) => void;
};

export function DropzoneButton({ setFile }: DropzoneButtonProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file drop event
  const handleDrop: DropzoneProps['onDrop'] = (files) => {
    setError(null);
    if (setFile && files[0]) {
      setFile(files[0]);
    }
  };

  // Handle rejected files (size/type)
  const handleReject: DropzoneProps['onReject'] = (fileRejections) => {
    if (fileRejections && fileRejections.length > 0) {
      const reason = fileRejections[0].errors[0];
      if (reason.code === 'file-too-large') {
        setError('File is too large. Please select an image under 5MB.');
      } else if (reason.code === 'file-invalid-type') {
        setError('Invalid file type. Only .jpg, .jpeg, .png files are allowed.');
      } else {
        setError('File could not be accepted.');
      }
      notifications.show({
        title: 'File upload error',
        message: error || 'File upload error',
        color: 'white',
        withBorder: true,
        autoClose: 6000,
        styles: {
          root: {
            backgroundColor: theme.colors.red[6],
          },
          description: {
            color: theme.colors.gray[3],
          },
          title: {
            color: theme.white,
          }
        },
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        onReject={handleReject}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPES}
        maxFiles={1}
        maxSize={5 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} className={classes.icon} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop image here</Dropzone.Accept>
            <Dropzone.Reject>Only .jpg, .jpeg, .png files under 5MB</Dropzone.Reject>
            <Dropzone.Idle>Upload an image</Dropzone.Idle>
          </Text>

          <Text className={classes.description}>
            Drag&apos;n&apos;drop <b>one image</b> here to upload. Only <i>.jpg</i>, <i>.jpeg</i>, <i>.png</i> files under 5MB are accepted.
          </Text>
        </div>
      </Dropzone>
      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select image
      </Button>
    </div>
  );
}