/** @format */

const tasks = []

function add0toNumber(num)
{
  let numStr = ''

  if (num >= 10) {
    numStr = `${num}`
  } else {
    numStr = `0${num}`
  }

  return numStr
}

function getAndPrintTime()
{
  const date = new Date();

  const time = `${add0toNumber(date.getHours())}:${add0toNumber(
    date.getMinutes()
  )}:${add0toNumber(date.getSeconds())}`;

  document.getElementById('time').innerHTML = time;
}

getAndPrintTime();

// setInterval(() =>
// {
//   getAndPrintTime()
// }, 1000)


function handlePrintTask(item, index)
{
  const container = document.createElement('div')

  const div = document.createElement('div')
  div.setAttribute('class', 'row mt-2 mb-2 list')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')

  const btn = document.createElement('button')
  btn.setAttribute('class', 'btn btn-sm btn-danger')

  btn.innerHTML = 'Del'
  btn.setAttribute('onclick', `handleRemoveTask(${index})`)

  const p = document.createElement('p')
  p.setAttribute('class', 'col list-item')
  p.innerHTML = item.content

  const createdAt = document.createElement('p')
  createdAt.innerHTML = new Date(item.createdAt).toISOString()


  div.appendChild(checkbox)
  div.appendChild(p)
  div.appendChild(btn)

  container.appendChild(div)
  container.appendChild(createdAt)

  document.getElementById('tasks-container').appendChild(container)

}

function handleAddNewTask()
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
  document.getElementById('inp-task').value = ''
}


function handleShowTasks()
{
  tasks.forEach((item, index) => handlePrintTask(item, index))
}

/*
  1. Lưu danh sách nhiệm vụ vào localstorage
  2. Mỗi lần thêm nhiệm vụ mới, kiểm tra xem có danh sách trong local chưa,
  nếu có thì thêm vào và lưu lại, nếu chưa có thì tạo mới và lưu lại
  3. hiển thị danh sách nhiệm vụ từ local
  4. khi người dùng bấm vào checkbox thì chuyển nội dung nhiệm vụ thành màu xám, gạch ngang nội dung
  5. Xoá nhiệm vụ
    Chỉ nhiệm vụ đã hoàn thành mới được xoá
    nếu chưa hoàn thành, hiển thị thông báo cho người dùng
*/ 