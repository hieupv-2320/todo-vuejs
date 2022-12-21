export default {
    notDone: (state) => {
        return Array.isArray(state.toDos) ? state.toDos.filter(m => m.completed == false).length : 0
      },
    Done: (state) => {
        return Array.isArray(state.toDos) ? state.toDos.filter(m => m.completed == true).length : 0;
    },
    allTasks: (state) =>  {
        return state.toDos.length
    }, 
    count: (state) => {
        return state.count
    }
}