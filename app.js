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
    expenseList = JSON.parse(localStorage.getItem('expenses')) || []

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


    // !create tbody elemet and get table element
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


// ! calculate all result
const calculateResult = ()=>{

    incomeNum.textContent = new Intl.NumberFormat().format(incomes)


    const expensess = expenseList.reduce((sum,x)=> sum +Number(x.amount),0)

    expenseNum.textContent = new Intl.NumberFormat().format(expensess)

    remainingNum.textContent =new Intl.NumberFormat().format(incomes - expensess)

  


}


// ! delete table tr

tbody.addEventListener('click',(e)=>{

    if (e.target.classList.contains("fa-trash-can")) {
        e.target.parentElement.parentElement.remove()

        const id = e.target.id
        expenseList= expenseList.filter((x => x.id != id))
    
        localStorage.setItem("expenses", JSON.stringify(expenseList))
     calculateResult()

    } else if(e.target.classList.contains('fa-pen-to-square')){
       const id = e.target.id
       const expenseEdit = expenseList.find((x) => x.id == id);
       console.log(expenseEdit);


      
       const expenseEditDate = new Date(expenseEdit.time);
       expenseEditDate.setDate(expenseEditDate.getDate() + 1);
       const formattedDate = expenseEditDate.toISOString().split('T')[0];

       dateInput.value = formattedDate;
        expenseInput.value = expenseEdit.expense;
        amountInput.value = expenseEdit.amount;

        e.target.parentElement.parentElement.remove();
    
        expenseList = expenseList.filter((x) => x.id != id);
        localStorage.setItem("expenses", JSON.stringify(expenseList));
        calculateResult();
     

    }


   
})








// ! reset all data

resetBtn.addEventListener('click',()=>{
 if(confirm('Are you sure you want to clear all data?')){

    expenseList = []
    incomes = 0
    localStorage.removeItem('expenses')
    localStorage.removeItem('incomes')
    tbody.textContent = ''
    calculateResult()
 }

})


document.addEventListener('DOMContentLoaded', function() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    var firstDayOfMonth = year + '-' + (month < 10 ? '0' : '') + month + '-01';

    if (today.toISOString().split('T')[0] > firstDayOfMonth) {
      document.getElementById('dateInput').setAttribute('min', firstDayOfMonth);
    }

    document.getElementById('dateInput').setAttribute('max', today.toISOString().split('T')[0]);
  });