import { GraphQLError } from "graphql";
import { petModelType, petDB } from "../db/pet.ts";

export const Query = {
        pets: async (args: {breed?: string}): Promise<petModelType[]> => {
          if (args.breed) {
            const pets = await petDB.find({ breed: args.breed });
            return pets;
          } else {
            const pets = await petDB.find();
            return pets;
          }
        },
    
        pet: async (_parent: unknown, args: {id: string}): Promise<petModelType> => {
          const pet = await petDB.findById(args.id);
          if (!pet) {
            throw new GraphQLError("Pet not found");
          }
          return pet;
        },
    
        petByBreed: async (_parent: unknown, args: {breed: string}): Promise<petModelType[]> => {
          const pets = await petDB.find({ breed: args.breed });
          return pets;
        },
    }