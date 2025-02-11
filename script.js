function addField(type) {
    const container = document.getElementById("formContainer");
    const fieldDiv = document.createElement("div");
    fieldDiv.classList.add("form-field");
    
    const label = document.createElement("input");
    label.type = "text";
    label.placeholder = "Field Label";
    fieldDiv.appendChild(label);
    
    let inputElement;
    if (type === "text") {
        inputElement = document.createElement("input");
        inputElement.type = "text";
    } else if (type === "dropdown") {
        inputElement = document.createElement("select");
        const optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Comma-separated options";
        optionInput.onchange = function() {
            inputElement.innerHTML = optionInput.value.split(",").map(opt => `<option>${opt.trim()}</option>`).join("");
        };
        fieldDiv.appendChild(optionInput);
    } else if (type === "checkbox" || type === "radio") {
        inputElement = document.createElement("div");
        const optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Comma-separated options";
        optionInput.onchange = function() {
            inputElement.innerHTML = "";
            optionInput.value.split(",").forEach(opt => {
                const input = document.createElement("input");
                input.type = type;
                input.name = type === "radio" ? `radioGroup${container.children.length}` : "";
                const label = document.createElement("label");
                label.textContent = opt.trim();
                inputElement.appendChild(input);
                inputElement.appendChild(label);
                inputElement.appendChild(document.createElement("br"));
            });
        };
        fieldDiv.appendChild(optionInput);
    }
    
    if (inputElement) fieldDiv.appendChild(inputElement);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => container.removeChild(fieldDiv);
    fieldDiv.appendChild(deleteBtn);
    
    container.appendChild(fieldDiv);
}