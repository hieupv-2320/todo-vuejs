<template>
    <div class="hello">
    {{ count }}
        <div class="box p-4" >   
            <div class="form-group ml-5 mr-5 row">
                <div class="col-10"> 
                    <input class="form-control" autofocus 
                        v-model.trim="newTodo" 
                        @keyup.enter="Add"  
                        @blur="Add" 
                        placeholder="Nhập việc cần làm và ấn Enter để thêm"> 
                </div>
                <div class="col-2"> 
                    <button @click="Add" class="btn btn-primary">
                        Add task
                    </button>
                </div>
            </div>
            <div>
                <table class="mt-3 listTodo">  
                    <p v-if="toDos.length <= 0"> 
                        Danh sách trống 
                    </p>
                    <tr v-for="item in toDos" 
                        :key="item.id" 
                        :class="{completed: item.completed}">
                        <td>
                            <input class="mark" type="checkbox" v-model="item.completed"> 
                            <span class="checkmark"></span>
                        </td>
                        <td>
                            <div class="ok"> 
                                <label @click="edit(item)"> 
                                    {{ item.title | capitalize }} 
                                </label>
                                <input  v-if="editting == item && item.completed!=true" 
                                    v-model="item.title" 
                                    :class="{}"
                                    @keyup.escape="cancelEditing"
                                    @keyup.enter="cancelEditing">
                            </div>
                        </td>
                        <td width="20%">
                            <a @click="Delete(item)" title="Xóa" class="delete badge badge-danger"> x </a> 
                        </td>
                    </tr>
                </table> 
                <div class="m-5 text-left" >
                    <b> Bạn có {{ allTasks }} task </b>
                    <span class="badge badge-warning">
                        Task còn lại: {{ notDone }} 
                    </span> 
                    <span class="badge badge-success"> 
                        Task đã xong: {{ Done }} 
                    </span> 
                </div>
            </div> 
        </div>
        <br>
        <span> Click vào task để sửa, ấn Enter để submit </span>
    </div>
</template>

<script>

export default {
  name: 'ToDoList',
  props: {
    toDos: Array,
    newTodo: String,
    editting: Object,
    itemLeft: Function
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
      this.$swal('Done')
      this.editting = null;
    }    
  },
  computed: {
    notDone: function () {
      return this.toDos.filter(m => m.completed == false).length 
    },
    Done() {
      return this.toDos.filter(m => m.completed == true).length
    },
    allTasks() {
      return this.toDos.length
    }, 
    count() {
      return this.$store.state.count
    }
  },
  filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
  },
  mounted () {
      this.$store.commit({
        type: 'increment',
        plus: 10,
      })
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
    color: #cccaca;
    text-decoration: line-through;
}
label {
    cursor:pointer;
}
.listTodo {
  font-size: 30px;
  margin: 0 auto;
}
table {
  width: 70%;
}
table, td {
  border: 1px black;
  text-align: left;
}
table td .delete {
  display: none;
}
table tr:hover .delete{
  display: block;
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
