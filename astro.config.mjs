// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  redirects: {
    '/': '/zh-cn/',
  },
  integrations: [
    starlight({
      title: 'OneKeyMiner',
      defaultLocale: 'zh-cn',
      locales: {
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
        en: {
          label: 'English',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Mai-xiyu/OneKeyMiner',
        },
      ],
      sidebar: [
        {
          label: '开始',
          translations: { en: 'Start' },
          items: [
            { 
              label: '简介',
              slug: 'intro',
              translations: { en: 'Introduction' }
            },
          ],
        },
        {
          label: '用户手册',
          translations: { en: 'User Manual' },
          items: [
            { 
              label: '使用指南',
              slug: 'guide/user-guide',
              translations: { en: 'User Guide' }
            },
          ],
        },
        {
          label: '开发者中心',
          translations: { en: 'Developer' },
          items: [
            { 
              label: 'API 文档',
              slug: 'dev/api-reference',
              translations: { en: 'API Reference' }
            },
          ],
        },
      ],
    }),
  ],
});