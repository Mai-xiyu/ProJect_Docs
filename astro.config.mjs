// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://mai-xiyu.github.io',
  base: '/ProJect_Docs',
  integrations: [
    starlight({
      title: 'Mai_xiyu Projects',
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
          label: 'OneKeyMiner',
          items: [
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
          ]
        },
        {
          label: 'Spartan Weaponry',
          items: [
             {
               label: '简介',
               slug: 'spartanweaponry/intro',
               translations: { en: 'Introduction' }
             },
             {
               label: 'API 参考',
               slug: 'spartanweaponry/api-reference',
               translations: { en: 'API Reference' }
             },
             {
               label: '资源包开发指南',
               slug: 'spartanweaponry/resource-pack-development-guide',
               translations: { en: 'Resource Pack Development Guide' }
             }
          ]
        }
      ],
    }),
  ],
});
