// File System Access API - Direct file modification
let fileHandle = null;
let fileData = null;

// Check for browser support
if (!('showOpenFilePicker' in window)) {
    document.getElementById('browserWarning').style.display = 'block';
}

// Update UI
function updateUI() {
    const editor = document.getElementById('editor');
    const fileInfo = document.getElementById('fileInfo');
    const status = document.getElementById('status');
    
    if (fileHandle) {
        fileInfo.innerHTML = `
            <strong>📄 File:</strong> ${fileHandle.name}<br>
            <strong>📁 Path:</strong> ${fileHandle.name}<br>
            <strong>🔒 Permissions:</strong> Read/Write
        `;
        editor.disabled = false;
        status.innerHTML = '✅ Ready to edit';
    } else {
        fileInfo.innerHTML = 'No file opened';
        editor.disabled = true;
        status.innerHTML = '';
    }
}

// Open file with direct write permission
async function openFile() {
    try {
        // Request user to select a file
        [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
            }],
            multiple: false
        });
        
        // Get file name
        const file = await fileHandle.getFile();
        const fileName = file.name;
        fileHandle.name = fileName; // Store name for display
        
        // Read the file
        const contents = await file.text();
        
        // Validate JSON
        try {
            fileData = JSON.parse(contents);
            document.getElementById('editor').value = 
                JSON.stringify(fileData, null, 2);
            updateUI();
            showStatus('✅ File opened successfully!', 'success');
        } catch (e) {
            showStatus('❌ Invalid JSON file', 'error');
        }
        
    } catch (err) {
        if (err.name !== 'AbortError') {
            showStatus('❌ Error opening file: ' + err.message, 'error');
        }
    }
}

// Save changes directly to the file
async function saveFile() {
    if (!fileHandle) {
        showStatus('❌ No file opened', 'error');
        return;
    }
    
    try {
        const editor = document.getElementById('editor');
        const content = editor.value.trim();
        
        // Validate JSON
        try {
            const jsonData = JSON.parse(content);
            
            // Request write permission (user may need to confirm)
            if (await verifyPermission(fileHandle, true)) {
                // Create writable stream
                const writable = await fileHandle.createWritable();
                
                // Write the content
                await writable.write(content);
                
                // Close the file
                await writable.close();
                
                // Update stored data
                fileData = jsonData;
                
                showStatus('✅ File saved directly to disk!', 'success');
            } else {
                showStatus('❌ Write permission denied', 'error');
            }
        } catch (e) {
            showStatus('❌ Invalid JSON - fix errors before saving', 'error');
        }
        
    } catch (err) {
        showStatus('❌ Error saving file: ' + err.message, 'error');
    }
}

// Verify we have permission to write to the file
async function verifyPermission(fileHandle, withWrite) {
    const options = {};
    if (withWrite) {
        options.mode = 'readwrite';
    }
    
    // Check if we already have permission
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
    }
    
    // Request permission
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
    }
    
    return false;
}

// Create a new JSON file
async function createNewFile() {
    try {
        // Show save file picker
        fileHandle = await window.showSaveFilePicker({
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
            }],
            suggestedName: 'data.json'
        });
        
        // Get file name
        const file = await fileHandle.getFile();
        fileHandle.name = file.name;
        
        // Create default JSON
        fileData = {
            name: "New Data",
            version: "1.0.0",
            created: new Date().toISOString(),
            users: [],
            settings: {
                theme: "light",
                notifications: true
            }
        };
        
        const content = JSON.stringify(fileData, null, 2);
        document.getElementById('editor').value = content;
        
        // Save the file
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        
        updateUI();
        showStatus('✅ New file created!', 'success');
        
    } catch (err) {
        if (err.name !== 'AbortError') {
            showStatus('❌ Error creating file: ' + err.message, 'error');
        }
    }
}

// Add a sample user to the data
async function addSampleUser() {
    if (!fileHandle || !fileData) {
        showStatus('❌ Open a file first', 'error');
        return;
    }
    
    try {
        // Ensure users array exists
        if (!fileData.users) {
            fileData.users = [];
        }
        
        // Add new user
        const newUser = {
            id: fileData.users.length + 1,
            name: `User ${fileData.users.length + 1}`,
            email: `user${fileData.users.length + 1}@example.com`,
            active: true,
            joined: new Date().toISOString().split('T')[0]
        };
        
        fileData.users.push(newUser);
        
        // Update editor
        const content = JSON.stringify(fileData, null, 2);
        document.getElementById('editor').value = content;
        
        showStatus(`✅ Added ${newUser.name}`, 'success');
        
    } catch (err) {
        showStatus('❌ Error adding user: ' + err.message, 'error');
    }
}

// Show status message
function showStatus(message, type) {
    const status = document.getElementById('status');
    status.innerHTML = message;
    status.style.color = type === 'error' ? '#f44336' : '#4CAF50';
    setTimeout(() => {
        status.innerHTML = '';
    }, 3000);
}

// Event listeners
document.getElementById('openFileBtn').addEventListener('click', openFile);
document.getElementById('saveFileBtn').addEventListener('click', saveFile);
document.getElementById('newFileBtn').addEventListener('click', createNewFile);
document.getElementById('addUserBtn').addEventListener('click', addSampleUser);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
            e.preventDefault();
            saveFile();
        }
        if (e.key === 'o') {
            e.preventDefault();
            openFile();
        }
    }
});

// Initial UI
updateUI();