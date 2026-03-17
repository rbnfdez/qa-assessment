#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const SKILL_NAME = 'qa-assessment';
const SKILL_SOURCE = path.join(__dirname, '..', 'qa-assessment', 'SKILL.md');

const TARGETS = {
  'claude-global': { label: 'Claude Code (global)', dir: path.join(os.homedir(), '.claude', 'commands') },
  'claude-project': { label: 'Claude Code (project)', dir: path.join(process.cwd(), '.claude', 'commands') },
  'cursor-global': { label: 'Cursor (global)', dir: path.join(os.homedir(), '.cursor', 'skills') },
  'cursor-project': { label: 'Cursor (project)', dir: path.join(process.cwd(), '.cursor', 'skills') },
  'windsurf-global': { label: 'Windsurf (global)', dir: path.join(os.homedir(), '.windsurf', 'skills') },
  'windsurf-project': { label: 'Windsurf (project)', dir: path.join(process.cwd(), '.windsurf', 'skills') },
};

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function install(target) {
  fs.mkdirSync(target.dir, { recursive: true });
  const dest = path.join(target.dir, `${SKILL_NAME}.md`);
  fs.copyFileSync(SKILL_SOURCE, dest);
  return dest;
}

async function main() {
  console.log('\n🎯 QA Assessment Skill Installer\n');

  if (!fs.existsSync(SKILL_SOURCE)) {
    console.error('❌ SKILL.md not found. Make sure the package is not corrupted.');
    process.exit(1);
  }

  console.log('Where do you want to install the skill?\n');
  const options = Object.entries(TARGETS);
  options.forEach(([, target], i) => {
    console.log(`  ${i + 1}) ${target.label}`);
  });
  console.log(`  ${options.length + 1}) All detected agents`);

  const answer = await ask(`\nChoose an option (1-${options.length + 1}): `);
  const choice = parseInt(answer, 10);

  if (isNaN(choice) || choice < 1 || choice > options.length + 1) {
    console.error('❌ Invalid option. Exiting.');
    process.exit(1);
  }

  if (choice === options.length + 1) {
    options.forEach(([, target]) => {
      const dest = install(target);
      console.log(`✅ ${target.label} → ${dest}`);
    });
  } else {
    const [, target] = options[choice - 1];
    const dest = install(target);
    console.log(`\n✅ ${target.label} → ${dest}`);
  }

  console.log('\n📋 How to use:');
  console.log('   Open your AI agent and type: "Run the QA assessment"\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Full Assessment: https://www.qevolution.tech');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main();
