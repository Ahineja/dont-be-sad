export interface DogBreed {
  id: string;
  type: string;
  attributes: DogBreedAttributes;
  relationships: DogBreedRelationships;
}

export interface DogBreedAttributes {
  name: string;
  description: string;
  life: {
    max: number;
    min: number;
  };
  male_weight: {
    max: number;
    min: number;
  };
  female_weight: {
    max: number;
    min: number;
  };
  hypoallergenic: boolean;
}

export interface DogBreedRelationships {
  group: {
    data: {
      id: string;
      type: string;
    };
  };
}

