import {defineType, defineField} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Navigation bar logo image',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'e.g. NEET Design Group',
    }),
    defineField({
      name: 'menuLinks',
      title: 'Menu Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'e.g. portfolio.html or index.html#about',
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'e.g. Start Your Project',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'e.g. contact.html',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Navigation'}
    },
  },
})
