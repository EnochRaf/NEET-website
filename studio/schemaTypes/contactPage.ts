import {defineType, defineField} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
      description: 'Small text above headline (e.g. "Get In Touch")',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline (e.g. "Start With a Plan. Not Purchases.")',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Paragraph below the headline',
    }),
    defineField({
      name: 'stepsHeading',
      title: 'Steps Section Heading',
      type: 'string',
      description: 'e.g. "What to Expect"',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Step Label', type: 'string'}),
            defineField({name: 'value', title: 'Step Description', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        },
      ],
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      description: 'e.g. "Tell Us About Your Project"',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Subtitle',
      type: 'string',
      description: 'e.g. "We review each inquiry carefully and will follow up with next steps."',
    }),
    defineField({
      name: 'calendarTitle',
      title: 'Calendar Section Title',
      type: 'string',
      description: 'e.g. "Schedule a Project Consultation"',
    }),
    defineField({
      name: 'calendarDescription',
      title: 'Calendar Section Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
