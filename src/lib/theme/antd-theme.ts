import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3651D4',
    borderRadius: 8,
    fontFamily: 'Inter, Arial, sans-serif',
  },
  components: {
    Button: {
      controlHeightLG: 40,
      borderRadius: 8,
      fontWeight: 600,
    },
    Input: {
      controlHeightLG: 40,
      borderRadius: 8,
    },
    Select: {
      controlHeightLG: 40,
      borderRadius: 8,
    },
    DatePicker: {
      controlHeightLG: 40,
      borderRadius: 8,
    },
  },
};
