const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

// buhuhuh

// Function to generate and download PDF invoice
function generatePDFInvoice(name, email, selectedSubjects) {
    // Define the props object for the invoice
    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Exam_Registration_Invoice.pdf",
        orientationLandscape: false,
        compress: true,
        invoice: {
            label: "Invoice #: ",
            num: 19,
            invDate: "Payment Date: 01/01/2021 18:12",
            invGenDate: "Invoice Date: 02/02/2021 10:17",
            headerBorder: false,
            tableBodyBorder: false,
            header: [
              {
                title: "#", 
                style: { 
                  width: 10 
                } 
              }, 
              { 
                title: "Title",
                style: {
                  width: 30
                } 
              }, 
              { 
                title: "Description",
                style: {
                  width: 80
                } 
              }, 
              { title: "Price"},
              { title: "Quantity"},
              { title: "Unit"},
              { title: "Total"}
            ],
            table: Array.from(Array(10), (item, index)=>([
                index + 1,
                "There are many variations ",
                "Lorem Ipsum is simply dummy text dummy text ",
                200.5,
                4.5,
                "m2",
                400.5
            ])),
            additionalRows: [{
                col1: 'Total:',
                col2: '145,250.50',
                col3: 'ALL',
                style: {
                    fontSize: 14 //optional, default 12
                }
            },
            {
                col1: 'VAT:',
                col2: '20',
                col3: '%',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'SubTotal:',
                col2: '116,199.90',
                col3: 'ALL',
                style: {
                    fontSize: 10 //optional, default 12
                }
            }],
            invDescLabel: "Invoice Note",
            invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    // Generate the invoice
    var pdfObject = jsPDFInvoiceTemplate.default(props);

    // Save the invoice as PDF
    pdfObject.save();
}

// Function to check if the maximum limit of checkboxes is exceeded
function checkMaxLimit() {
    const selectedIGCSE = getSelectedSubjects('igcse');
    const selectedAS = getSelectedSubjects('as');
    const selectedA = getSelectedSubjects('a');

    if (selectedIGCSE.length > 2 || selectedAS.length > 2 || selectedA.length > 2) {
        alert('Max Subjects to be selected from each level is 2');
        return false;
    }
    return true;
}

// Function to get selected subjects from each category
function getSelectedSubjects(category) {
    return document.querySelectorAll(`input[data-category="${category}"]:checked`);
}

// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    if (!checkMaxLimit()) {
        return; // If limit exceeded, stop further processing
    }

    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const selectedSubjects = document.querySelectorAll('input[type="checkbox"]:checked');

    // Generate PDF invoice
    generatePDFInvoice(name, email, selectedSubjects);

    // Show the "Generate Invoice" button
    document.getElementById('generateInvoiceBtn').style.display = 'block';
});

// Event listener for "Generate Invoice" button click
document.getElementById('generateInvoiceBtn').addEventListener('click', function () {
    // Generate PDF invoice again (optional)
    generatePDFInvoice(name, email, selectedSubjects);
});
