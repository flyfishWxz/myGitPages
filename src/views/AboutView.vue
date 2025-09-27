<template>
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
    <h2>Hi, be my friends!! stay your email, name, and instruction. i will reply</h2>
    <div style="display: none;">
      一、基础概念类
        请用一句话解释 “智能合约” 的核心定义，以及它和传统纸质 / 电子合同的最大区别是什么？
        智能合约的 “不可篡改” 是绝对的吗？如果合约上线后发现漏洞，有哪些补救方式（举 1-2 个常见方案即可）？
        你知道哪些主流的智能合约开发语言？分别对应哪些区块链平台（例如：Solidity 对应以太坊）？
      二、安全漏洞与防范类（核心高频）
        智能合约中最常见的 “重入攻击” 是什么原理？如何用代码（或思路）防范（比如举一个简单的防御示例）？
        “整数溢出 / 下溢” 漏洞会导致什么问题？Solidity 0.8.x 版本后，这个问题有什么变化？
        什么是 “权限控制漏洞”？比如一个 ERC20 代币合约，如果忘记给管理员设置 mint（铸造）权限，会有什么风险？
      三、标准协议与开发场景类
        ERC20 代币合约的核心方法有哪些（至少说出 3 个，比如 transfer）？transfer 和 transferFrom 的区别是什么？
        ERC721（NFT 标准）和 ERC20 的核心区别是什么？为什么 ERC721 能实现 “每个代币唯一”？
        假设要写一个简单的 “转账分润” 合约（比如用户 A 转账给 B 时，自动给合约 owner 分 1% 手续费），核心逻辑应该怎么设计（不用写完整代码，说清步骤即可）？
      四、开发工具与环境类
        你常用的智能合约开发框架有哪些（比如 Truffle、Hardhat、Anchor）？用这些框架做过哪些核心操作（比如编译、测试、部署）？
        智能合约部署到以太坊测试网（比如 Sepolia）和主网的主要区别是什么？部署前需要准备什么（比如 gas 费用、账户私钥）？
        如何验证一个已部署到区块链上的智能合约代码（比如在 Etherscan 上）？为什么要做代码验证？
      五、优化与测试类
        智能合约开发中，“Gas 优化” 是什么意思？举 1-2 个简单的 Gas 优化技巧（比如减少存储变量、避免循环）。
        为什么智能合约需要做测试？你常用的测试工具或方法有哪些（比如 Hardhat Test、Truffle Test）？
        假设一个合约上线后，发现 “用户转账后余额计算错误”，你会怎么排查问题（从思路上说明，比如查链上日志、复现测试场景）？
    </div>
    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="instruction">
      <el-input v-model="form.instruction" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  email: string
  instruction: string
}
// do not use same name with ref
const form = reactive({
  name: '',
  email: '',
  instruction: ''
})
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' }
  ],
  email: [
    {
      required: true,
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  instruction: [
    { required: true, message: 'Please input your instruction', trigger: 'blur' },
    { min: 3, max: 200, message: 'Length should be 3 to 200', trigger: 'blur' }
  ]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // await formEl.validate().then((valid, fields) => {
  //   // 打开或创建数据库
  //   var request = indexedDB.open('myDatabase', 1);

  //   // 如果数据库版本变化或首次创建时触发
  //   request.onupgradeneeded = function(event) {
  //     var db = event?.target?.result;

  //     // 创建对象存储（表），设置主键为 'id'
  //     var objectStore = db.createObjectStore('customers', { keyPath: 'id' });

  //     // 为 'name' 字段创建索引
  //     objectStore.createIndex('name', 'name', { unique: true });
  //     objectStore.createIndex('email', 'email', { unique: true });
  //   };
    
  //   request.onsuccess = function(event) {
  //       var db = event?.target?.result;
  //         // 查询数据
  //       var queryTransaction = db.transaction(['customers']);
  //       var queryObjectStore = queryTransaction.objectStore('customers');
  //       var query = queryObjectStore.get(1);

  //       query.onsuccess = function(event) {
  //         console.log('Customer:', event.target.result);
  //       };
  //       // 插入数据
  //       var transaction = db.transaction(['customers'], 'readwrite');
  //       var objectStore = transaction.objectStore('customers');
  //       objectStore.add(form);

  //       transaction.oncomplete = function() {
  //         console.log('Transaction completed: data added.');
  //       };

  //       transaction.onerror = function(event) {
  //         console.error('Transaction failed:', event);
  //       };

  //       // 更新数据
  //       // var updateTransaction = db.transaction(['customers'], 'readwrite');
  //       // var updateObjectStore = updateTransaction.objectStore('customers');
  //       // var updatedCustomer = { id: 1, name: 'John Smith', email: 'johnsmith@example.com' };

  //       // updateObjectStore.put(updatedCustomer);

  //       // updateTransaction.oncomplete = function() {
  //       //   console.log('Transaction completed: data updated.');
  //       // };
  //     };

  //   // 错误处理
  //   request.onerror = function(event) {
  //     console.error('Database error:', event.target.error);
  //   };
  // });
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
