<template>
    <div class="hello">
        <input v-model.trim="newTodo" @keyup.enter="Add"  @blur="Add" placeholder="Nhập việc cần làm và ấn Enter để thêm"> 
        <div class="box" >   
            <table class="mt-3 listTodo">  
                <p v-if="toDos.length <= 0"> Danh sách trống </p>
                <tr v-for="item in toDos" :key="item.id" :class="{completed: item.completed}">
                    <td>
                        <input class="mark" type="checkbox" v-model="item.completed"> 
                    </td>
                    <td>
                        <div class="ok"> 
                            <label @click="edit(item)"> {{ item.title | capitalize }} </label>
                            <input  v-if="editting == item && item.completed!=true" 
                                v-model="item.title" 
                                :class="{}"
                                @keyup.escape="cancelEditing"
                                @keyup.enter="cancelEditing">
                        </div>
                    </td>
                    <td>
                        <a @click="Delete(item)" class="badge badge-danger"> x </a> 
                    </td>
                </tr>
            </table> 
        </div>
    </div>
</template>

<script>
export default {
  name: 'ToDoList',
  props: {
    toDos: Array,
    newTodo: String,
    editting: Object
  },
  created() {
    console.log(this.newTodo)
  },
  methods: {
    Add () {
      if (this.newTodo.length) {
        this.toDos.push({ 
        title: this.newTodo, completed: false })
        this.newTodo = null
      }
    },
    Delete (item) {
      this.$swal.fire({
        title: 'are you sure?',
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if(result.isConfirmed) {
          const index = this.toDos.indexOf(item)
          this.toDos.splice(index, 1)
          this.$swal('Done it')
        }
      })
    },
    edit (item) {
      this.editting = item;
    },
    cancelEditing () {
      this.editting = null;
    }    
  },
  filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  font-size: 15px;
  cursor: pointer;
  margin-left: 20px
}
.completed label{
    color: black;
    text-decoration: line-through;
}
label {
    cursor:pointer;
}
.listTodo {
  font-size: 30px;
  margin: 0 auto;
}
table, td {
  border: 1px black;
  text-align: left;
}
.box {
  width: 50%;
  height: auto;
  margin: 0 auto;
  margin-top: 10px;
  box-shadow: 0px 12px 23px 0px #c1c1c1;
  border: 1px solid #e2e2e2;
}
.mark {
  width: 50px;
  height: auto;
}
.ok {
  position: relative;
}

.ok input {
  position: absolute;
  width: 100%;
  
  top: 0px;
  left: 0px;
}
</style>
