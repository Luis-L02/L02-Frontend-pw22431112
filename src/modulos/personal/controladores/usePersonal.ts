import { ref } from "vue"
import type { Personal } from "../interfaces/personal-interface";
import { personalAPI } from "../api/personalAPI";


export const usePersonal = () => {
    const personal = ref<Personal[]>([]); // inicializando el personal con ref para mostrarlo en la vista

    const getPersonal = async () => {
        const response = await personalAPI.get<Personal[]>('') // petición get para obtener el personal
        personal.value = response.data; // asignando el personal a la variable personal
    }; // función para obtener el personal

    return {
        personal,
        getPersonal
    }
}

