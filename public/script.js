function setup() {
    drawData()
}

function drawData() {
    loadJSON('/all', gotData);
}

function gotData(data) {
    console.log(data);
    const subsection = Object.values(data)
    console.log(subsection);
    subsection.forEach(item => {

        Object.keys(item).forEach(key => {
            addToSection(key, item[key])
        })
    });
}


// takes the data from the templates json and populates the UI to the corresponding section
function addToSection(section, beoItem) {
    let sectionName = document.getElementById(section);

    if (sectionName.id = section) {
        beoItem.forEach(item => {

            let wrapper = document.createElement('div')
            wrapper.className = 'item-wrapper'

            let delBtn = document.createElement('button')
            delBtn.className = 'delete-btn'
            delBtn.innerText = 'X'


            let template = document.createElement('a')
            template.innerText = item
            template.className = 'beo-items'
            template.href = '#'

            wrapper.append(template, delBtn)

            sectionName.append(wrapper)


            delBtn.addEventListener('click', e => {
                e.preventDefault();
                delItem(e);
            })


            template.addEventListener('click', e => {
                e.preventDefault();
                console.log(e.target.innerText);
                navigator.clipboard.writeText(e.target.innerText)

            })
        });

    }
    // add item button
    addItemBtn(sectionName)
    // add delete button

}

// delete button

function delItem(e) {

    let section = e.path[3]
    let subSection = e.path[2]
    let item = e.path[1].querySelector('.beo-items').innerText
    console.log(section.id, subSection.id, item);

    loadJSON(`/delete/${section.id}/${subSection.id}/${item}`, finished)

}

function finished() {
    console.log('finished');
}



// creates add item button

function addItemBtn(section) {

    let btn = document.createElement('button')
    btn.innerText = '+'
    section.appendChild(btn)

    btn.addEventListener('click', e => {
        e.preventDefault
        let inputBox = e.path[1].querySelector('.input-container')
        inputBox.classList.toggle('open')

    })
    inputBox(section)

}
// input box
function inputBox(category) {

    let container = document.createElement('div')
    container.className = 'input-container'

    let inputBox = document.createElement('input')

    let submitBtn = document.createElement('button')

    submitBtn.innerText = 'Submit'

    container.append(inputBox, submitBtn)

    category.appendChild(container)

    submitBtn.addEventListener('click', e => {
        e.preventDefault()

        let section = e.path[3].id;
        let subSection = e.path[2].id

        addItem(section, subSection, inputBox.value)

    })
}

function addItem(section, subSection, input) {

    loadJSON(`/addItem/${section}/${subSection}/${input}`, updateUI)
}

function updateUI() {
    window.location.reload()
}

// Accordion
const accordionBtns = document.querySelectorAll(".accordion");
accordionBtns.forEach((accordion) => {
    accordion.onclick = function () {
        this.classList.toggle("is-open");

        let content = this.nextElementSibling;

        if (content.style.maxHeight) {
            //this is if the accordion is open
            content.style.maxHeight = null;
        } else {
            //if the accordion is currently closed
            content.style.maxHeight = content.scrollHeight + "px";
            // console.log(content.style.maxHeight);
        }
    };
});

function copyToClipboard(item) {
    navigator.clipboard.writeText(item.innerText)
}


const items = document.querySelectorAll('.beo-items')

items.forEach(item => {

    item.addEventListener('click', e => {
        e.preventDefault()
        console.log(item);
        item.toggleAttribute('active')
        copyToClipboard(item)

    })
})
