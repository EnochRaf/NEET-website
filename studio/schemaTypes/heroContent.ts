import {defineType, defineField} from 'sanity'

export const heroContent = defineType({
  name: 'heroContent',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Top Label',
      type: 'string',
      description: 'Small text above the headline (e.g. "For Those Who Expect More Than Beautiful.")',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Headline Line 1',
      type: 'string',
      description: 'First line of the headline (e.g. "Designed With")',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Headline Accent Word',
      type: 'string',
      description: 'The italic/blue word (e.g. "Intention.")',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Headline Line 2',
      type: 'string',
      description: 'Second line of the headline (e.g. "Built Without Regret.")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      description: 'Paragraph below the headline',
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Call-to-action button label (e.g. "Start Your Project")',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL the button links to (e.g. "contact.html")',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      title: 'titleLine1',
      subtitle: 'titleAccent',
      media: 'backgroundImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: `${title || ''} ${subtitle || ''}`,
        media,
      }
    },
  },
})
