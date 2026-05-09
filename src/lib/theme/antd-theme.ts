import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3651D4',
    borderRadius: 8,
    fontFamily: 'Inter, Arial, sans-serif',
  },
  components: {
    Button: {
      controlHeightLG: 48,
      borderRadius: 12,
      fontWeight: 600,
      paddingInlineLG: 24,
      contentFontSizeLG: 16,
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
