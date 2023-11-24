import { GraphQLError } from "graphql";
import { petDB, petModelType } from "../db/pet.ts";

export const Mutation = {

    getAllPets: async (): Promise<petModelType[]> => {
        const pets = await petDB.find();
        return pets;
    },

    getPetByBreed: async (_parent: unknown, args: { breed: string}): Promise<petModelType[]> => {
        const pets = await petDB.find({breed: args.breed});
        return pets;
    },

    addPet: async (_parent: unknown, args: { id: string, name: string; breed: string }): Promise<petModelType> => {
        const existsPet = await petDB.findOne({ id: args.id });
    
        if (existsPet) {
          throw new GraphQLError("Pet already exists");
        }
    
        const newPet = new petDB({ id: args.id, name: args.name, breed: args.breed });
        await newPet.save();
        return newPet;
      },

      deletePet: async (_parent: unknown, args: { id: string }): Promise<petModelType> => {
        const deletedPet = await petDB.findByIdAndRemove({id: args.id});

        if (!deletedPet) {
          throw new GraphQLError("No pet found with id");
        }
    
        return deletedPet;
      },
    
      updatePet: async (_parent: unknown, args: { id: string; name: string; breed: string }): Promise<petModelType> => {
        const updatedPet = await petDB.findOneAndUpdate({ id: args.id }, { name: args.name, breed: args.breed }, { new: true });
    
        if (!updatedPet) {
            throw new GraphQLError("No pet found with id");
        }
        
        return updatedPet;
      },
    };