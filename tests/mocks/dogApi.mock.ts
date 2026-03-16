import type { DogBreed } from '../../app/models/DogBreedInterface'

export const mockBreeds: DogBreed[] = [
  {
    id: '1',
    type: 'breed',
    attributes: {
      name: 'Golden Retriever',
      description: 'A very good boy.',
      life: { min: 10, max: 12 },
      male_weight: { min: 29, max: 34 },
      female_weight: { min: 25, max: 29 },
      hypoallergenic: false,
    },
    relationships: {
      group: {
        data: {
          id: 'f56dc4b1-ba1a-4454-8ce2-bd5d41404a0c',
          type: 'group',
        },
      },
    },
  },
]

export const mockDogCeoRandomImageResponse = {
  status: 'success',
  message: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg',
}
