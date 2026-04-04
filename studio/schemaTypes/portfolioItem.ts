import {defineType, defineField} from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g. White Shaker Kitchen',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Kitchen', value: 'Kitchen'},
          {title: 'Living Room', value: 'Living Room'},
          {title: 'Bedroom', value: 'Bedroom'},
          {title: 'Bathroom', value: 'Bathroom'},
          {title: 'Outdoor', value: 'Outdoor'},
          {title: 'Commercial', value: 'Commercial'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within each category',
    }),
  ],
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
