<template>
    <section>
        <h3>Personal</h3>
        <div>
            <button class="btn btn-sm btn-outline-primary">
                <i class="fa fa-plus"></i>
                Agregar 
            </button>
        </div>    
    </section>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Estatus</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="personal.length === 0 || personal.length === undefined">
                <td class="centrado" colspan="5">No hay registros</td>
            </tr>
            <tr v-else v-for="(persona, index) in personal" :key="index">
                <td>{{ persona.id }}</td>
                <td>{{ persona.nombre }}</td>
                <td>{{ persona.direccion }}</td>
                <td>{{ persona.telefono }}</td>
                <td>{{ persona.estatus }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { usePersonal } from '../controladores/usePersonal';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const { getPersonal , personal } = usePersonal();


onMounted(async () => {
    await getPersonal();
    if(personal.value.length === 0 || personal.value.length === undefined){
        notify();
    }
    if(personal.value.length ===1){
        notifyOne();
    }
});


const notify = ()=>{
    toast.warn("No hay registros disponibles!",{
        autoClose : 2000,
        position: "top-right",
    });
}

const notifyOne = ()=>{
    toast.info(`[ ${personal.value.length} ] Registro encontrado`,{
        autoClose: 2000,
        position: "top-right"
    })
}

watch(personal, (newVal)=>{
    if (newVal.length === 0) {
        notify()
    }
})

</script>

<style scoped>
section {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 20px;
}
.centrado {
    text-align: center;
}
</style>
