/** @format */


const tasks = []

const handleGetAllTasksFromLocal = async () =>
{
  const res = await localStorage.getItem('tasks')

  if (res) {
    const items = JSON.parse(res)
    items.forEach((item, index) =>
    {
      handlePrintTask(item, index)
      tasks.push(item)
    })

    // tasks.forEach(item => handlePrintTask(item))
  }
}

handleGetAllTasksFromLocal()

const handleAddNewTask = async () =>
{
  const newTask = document.getElementById('inp-task').value

  const task = {
    content: newTask,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isCompleted: false,
    createdBy: 'my'
  }

  tasks.push(task)
  handlePrintTask(task, tasks.length - 1)

  document.getElementById('inp-task').value = ''

  await handleSaveToLocalStorage(tasks, 'tasks').then(() => console.log('Saved'))
}


const handleSaveToLocalStorage = async (val, name) =>
{
  await localStorage.setItem(name, JSON.stringify(val))
}


const handleRemoveTask = (id) =>
{
  const container = document.getElementById('tasks-container')
  const element = document.getElementById(`task${id}`)
  container.removeChild(element)

  tasks.splice(id, 1)

  handleSaveToLocalStorage(tasks, 'tasks')
}

const handlePrintTask = (item, index, replace) =>
{

  const container = document.createElement('li')
  container.setAttribute('class', 'list-group-item')
  container.setAttribute('id', `task${index}`)

  const div = document.createElement('div')
  div.setAttribute('class', 'row mt-2 mb-2 list')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', `cb-task-${index}`)
  checkbox.setAttribute('onchange', `handleChangeCompletedStatus(${index})`)

  const btn = document.createElement('button')
  btn.setAttribute('class', 'btn btn-sm btn-danger')

  btn.innerHTML = '<i class="fas fa-trash text-light"></i>'
  btn.setAttribute('onclick', `handleRemoveTask(${index})`)

  const p = document.createElement('p')
  p.setAttribute('class', `col list-item ${item.isCompleted ? 'text-muted' : '#676767'}`)
  p.setAttribute('id', `content-${index}`)
  p.innerHTML = item.content



  div.appendChild(checkbox)
  div.appendChild(p)
  div.appendChild(btn)

  container.appendChild(div)

  if (replace) {
    document.getElementById(replace).replaceChild(container, container)
  } else {

    document.getElementById('tasks-container').appendChild(container)
  }


}

const handleChangeCompletedStatus = (id) =>
{
  const isChecked = document.getElementById(`cb-task-${id}`).checked

  const item = {
    ...tasks[id],
    isCompleted: isChecked
  }



  handlePrintTask(item, id, `cb-task-${id}`)



  // if (isChecked) {
  //   container.replaceChild(content, `<p>fakfhskj</p>`)
  // }
}


