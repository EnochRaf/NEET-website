import {defineType, defineField} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'e.g. NEET Design Group',
    }),
    defineField({
      name: 'brandDescription',
      title: 'Brand Description',
      type: 'text',
      rows: 3,
      description: 'Short description under the logo',
    }),
    defineField({
      name: 'exploreLinks',
      title: 'Explore Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'e.g. (858) 250-9997',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'e.g. info@neetdesigngroup.com',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Orange County, CA',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Pinterest', value: 'pinterest'},
                ],
              },
            }),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'e.g. 2026 NEET Design Group. All rights reserved.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Footer'}
    },
  },
})
