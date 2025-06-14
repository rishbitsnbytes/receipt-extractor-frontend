import { MantineTheme } from '@mantine/core';

const commonNotificationStyles = {
  withBorder: true,
  autoClose: 6000,
}

const getErrorNotificationStyles = (theme: MantineTheme) => ({
  color: 'white',
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
})

export {
  commonNotificationStyles,
  getErrorNotificationStyles,
}