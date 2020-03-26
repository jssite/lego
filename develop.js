const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function publish() {
  await exec('git pull')
  await exec('yarn build:prod')
  await exec('rm -fr _dist')
  const exec_result = await exec('git rev-parse --abbrev-ref HEAD')
  const branch_name = exec_result.stdout.replace(/\n$/, '').toString()
  const commit = process.env.commit || '"Auto develop."'
  try{
    await exec('git clone --branch ' + branch_name + ' git@git.hexindai.com:hexindai-incubator/lego-web-dist.git _dist')
  } catch(e) {
    await exec('git clone git@git.hexindai.com:hexindai-incubator/lego-web-dist.git _dist')
    await exec('cd _dist && git checkout -b ' + branch_name + ' && git push --set-upstream origin feature/api')
  }
  await exec('rm -fr _dist/*')
  await exec('yes | cp -fr ./dist/* ./_dist/')
  try{
    await exec('cd _dist && git add -A && git commit -m ' + commit + ' && git push --quiet --force')
  } catch(e) {

  }
}

publish()
