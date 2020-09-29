#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
])
.then(answer=>{
    const temDir = path.join(__dirname, 'templats')
    const destDir =process.cwd()

    fs.readdir(temDir, (err, files)=>{
        if (err) throw err
        files.forEach((file)=>{
            ejs.renderFile(path.join(temDir, file), answer, (err, result)=>{
                if(err) throw err

                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})