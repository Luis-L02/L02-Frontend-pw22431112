<template>
    <section>
        <h3>Personal</h3>
        <div>
            <RouterLink :to="{path: '/personal/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    <i class="fa fa-plus"></i>
                    Agregar 
                </button>
            </RouterLink>
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
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="personal.length === 0 || personal.length === undefined">
                <td class="centrado" colspan="6">No hay registros</td>
            </tr>
            <tr v-else v-for="(persona, index) in personal" :key="index">
                <td>{{ persona.id }}</td>
                <td>{{ persona.nombre }}</td>
                <td>{{ persona.direccion }}</td>
                <td>{{ persona.telefono }}</td>
                <td>{{ persona.estatus }}</td>
                <td class="text-center">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{path: '/personal/'+ persona.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-link item" :to="{path: '/personal/'+ persona.id + '/borrar'}"><i class="fa fa-trash"></i></RouterLink>
                        </button>
                    </div>
                </td>
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
});


const notify = ()=>{
    toast.warn("No hay registros disponibles!",{
        autoClose : 2000,
        position: "top-right",
    });
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
