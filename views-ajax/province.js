let index = 0;

function displayStudentList() {
    window.open("student.html");
}

function getProvinces() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/provinces",
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th colspan="3">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayProvince(data[i]);
            }
            document.getElementById("provinceList").innerHTML = content;
            document.getElementById("form").hidden = true;
        }
    });
}

function displayProvince(province) {
    return `<tr><td>${province.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteProvince(${province.id})"><i class="fa-solid fa-trash"></i></button></td>
                    <td><button class="btn btn-warning" onclick="editProvince(${province.id})"><i class="fa-solid fa-pencil"></i></button></td>
                    <td><button class="btn btn-warning" onclick="detailProvince(${province.id})"><i class="fa-solid fa-info"></i></button></td></tr>`;
}

function displayFormCreate() {
    document.getElementById("form").reset()
    document.getElementById("form").hidden = false;
    document.getElementById("form-button").onclick = function () {
        addNewProvince();
    }
}

function addNewProvince() {
    //lấy dữ liệu
    let name = $('#name').val();
    let newProvince = {
        name: name
    };

    //gọi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProvince),
        //tên API
        url: "http://localhost:8080/api/provinces",
        //xử lý khi thành công
        success: function () {
            getProvinces();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function deleteProvince(id) {
    if (confirm('Are you sure you want to delete ?') === true) {
        $.ajax({
            type: 'DELETE',
            url: `http://localhost:8080/api/provinces/${id}`,
            success: function () {
                getProvinces()
            }
        });
    }
}

function editProvince(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/provinces/${id}`,
        success: function (data) {
            $('#name').val(data.name);
            index = data.id;
            document.getElementById("form").hidden = false;
            document.getElementById("form-button").onclick = function () {
                updateProvince()
            };
        }
    });
}

function updateProvince() {
    let name = $('#name').val();
    let newProvince = {
        name: name
    };

    //gọi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'PUT',
        data: JSON.stringify(newProvince),
        //tên API
        url: `http://localhost:8080/api/provinces/${index}`,
        //xử lý khi thành công
        success: function () {
            getProvinces();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function detailProvince(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/provinces/view/${id}`,
        success: function (data) {
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Average Point</th>\n' +
                '<th>Image</th>\n' +
                '<th>Province</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayStudent(data[i]);
            }
            document.getElementById("studentList").hidden = false;
            document.getElementById("studentList").innerHTML = content;
        }
    });
}

function displayStudent(student) {
    return `<tr><td>${student.name}</td><td>${student.avgPoint}</td><td>${student.imageUrl}</td><td>${student.province.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteStudent(${student.id})"><i class="fa-solid fa-trash"></i></button></td>
                    <td><button class="btn btn-warning" onclick="editStudent(${student.id})"><i class="fa-solid fa-pencil"></i></button></td></tr>`;
}

getProvinces()