// ? for add

const addBtn = document.getElementById('add')
const incomeInput = document.getElementById('incomeInput')
const incomeForm = document.getElementById('incomeForm')

// ? for result

const incomeNum = document.getElementById('income')
const expenseNum =document.getElementById('expense')
const remainingNum = document.getElementById('remaining')
const remainText = document.getElementById('remaininText')

// ? for income 

const inputForm = document.getElementById('inputForm')
const dateInput = document.getElementById('dateInput')
const expenseInput = document.getElementById('expenseInput')

const amountInput = document.getElementById('amountInput')

// ? for table

const tbody = document.getElementById('expenseBody')

// ? for reset

const resetBtn = document.getElementById('reset')


// ? variable 

let  incomes = 0

let  expenseList = []


// ! for add buton
incomeForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    incomes = incomes + Number(incomeInput.value)
    incomeNum.textContent = incomes
    localStorage.setItem('incomes',incomes)
    incomeForm.reset()
    calculateResult()
   
})

// ! for window load

window.addEventListener('load',()=>{

    incomes= Number(localStorage.getItem('incomes')) || 0
    incomeNum.textContent = incomes
    dateInput.valueAsDate = new Date()
    expenseList = JSON.parse(localStorage.getItem('expensess')) || []

    expenseList.forEach((x)=>writeDom(x))
    calculateResult()
})


// ! inputform data

inputForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const newExpense = {

        id: new Date().getTime(),
        time: new Date(dateInput.value).toLocaleDateString(),
        expense: expenseInput.value,
        amount: amountInput.value
    }

    inputForm.reset()
    dateInput.valueAsDate = new Date()
    expenseList.push(newExpense)
    localStorage.setItem('expenses',JSON.stringify(expenseList))
    writeDom(newExpense)
    calculateResult()


})

// ! writeDom for tbody function

const writeDom = ({id,amount,time,expense}) =>{

    const tr = document.createElement('tr')

    const appendTd = (content)=>{

        const td = document.createElement('td')
        td.textContent = content
        return td
    }

    const createLastTd = ()=>{

        const td = document.createElement('td')
        const iconEdit = document.createElement('i')
        const iconTrash = document.createElement('i')

        iconEdit.id = id
        iconEdit.className = "fa-solid fa-pen-to-square text-danger me-2"
        iconEdit.style.cursor ='pointer'
        iconEdit.type ='button'
        td.appendChild(iconEdit);

        iconTrash.id = id;
        iconTrash.className ="fa-solid fa-trash-can text-danger"
        iconTrash.type = 'button'
        iconTrash.style.cursor ='pointer'
        td.appendChild(iconTrash);

        return td
        
    }

    tr.append(
        appendTd(time),
        appendTd(expense),
        appendTd(amount),
        createLastTd()
    )

    tbody.append(tr)

}


const calculateResult = ()=>{

    incomeNum.textContent = new Intl.NumberFormat().format(incomes)


    const expensess = expenseList.reduce((sum,x)=> sum +Number(x.amount),0)

    expenseNum.textContent = new Intl.NumberFormat().format(expensess)

    remainingNum.textContent =new Intl.NumberFormat().format(incomes - expensess)

  


}


tbody.addEventListener('click',(e)=>{

    if (e.target.classList.contains("fa-trash-can")) {
        e.target.parentElement.parentElement.remove()
    }


    const id = e.target.id
    expenseList= harcamaListesi.filter((harcama => harcama.id != id))



})
