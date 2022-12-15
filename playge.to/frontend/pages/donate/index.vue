<template>
	<div class="content">
		<div class="title-page">
			<span>Deposit Plan</span>
		</div>
		<div class="deposit flex-s">
			<div class="depositBlock" :class="selectedPl == i ? 'active': ''" v-for="(p, i) in plans" :key="i" @click="setDepositItem(i)">
				<div class="depositBlock-img flex-c-c">
					<img :src="require(`@/assets/images/${p.img}`)" alt="">
				</div>
				<div class="depositBlock-coinPrice flex">
					<i class="deposit-coin"></i>
					<span class="depositBlock-coinPrice_n">{{p.coin}}</span>
					<span class="depositBlock-coinPrice_c">Coins</span>
				</div>
				<div class="deposit-price">
					${{p.price}}
				</div>
			</div>
		</div>
		<div class="payMethod">
			<div class="small-title">
				<span>Payment Method</span>
			</div>
			<div class="payMethod-flex flex-s">
				<div class="payMethod-block flex-c-c" v-for="(pm, i) in paymentMethods" :key="i" @click="setPaymentMethod(i)" :class="selectedPM == i ? 'active': ''" style="background-size: 100% 100%; width: 155px">
					<img :src="require('@/assets/images/' + pm.img)" style="width: 80%;">
				</div>
			</div>
		</div><!--payMethod-->
		<div class="confirm">
			<div class="small-title">
				<span>Confirm Order</span>
			</div>
			<div class="confirm-flex flex-c">
				<div class="confirmBlock">
					<p>Deposit Plan:</p>
					<span>{{paymentPlan}} <b>Coins</b></span>
				</div>
				<div class="confirmBlock">
					<p>Payments Method:</p>
					<span>{{paymentTitle}}</span>
				</div>
				<div class="confirmBlock">
					<p>Payments Total Sum:</p>
					<span>${{paymentTotal}}</span>
				</div>
				<div class="confirmPay">
					<a @click="payNow()" class="button">Pay Now</a>
				</div>
			</div>
		</div>
		<!-- <b-modal v-model="modalShow">
			<div v-html="widget"></div>
		</b-modal> -->
		<!-- <div v-if ="widget" class="overlay">
			<div class="payment-widget">
				<header id="__BVID__563___BV_modal_header_" class="modal-header">
					<h5 id="__BVID__563___BV_modal_title_" class="modal-title"></h5>
					<button @click="closeWidget" type="button" aria-label="Close" class="close me-button">×</button>
				</header>
			</div>
		</div> -->
		<!-- <div v-html="widget" class="pt-5"></div>
		<object :data="widget">

		</object> -->
		<!-- <iframe sandbox="allow-same-origin allow-forms allow-scripts">{{widget}}</iframe> -->
		<!-- <iframe id="iframe" width="572px" scrolling="auto" height="335px" 
        frameborder="1" src="http://XXXX.com/iframe-page"
        style="border: 0px none #ffffff;" name="national-campaign" 
        marginheight="0px" marginwidth="0px">
</iframe> -->
	</div>
</template>
<script>
	import axios from 'axios'
	// import paymentwall from 'paymentwall';

	export default {
		head() {
			return {
				script: [
					{
						src: "https://widget.unitpay.ru/unitpay.js",
						body: true,
						async: true,
						defer: true
					}
				],
			}
		},
		data() {
			return {
				plans: 
					[
						{price: 10, img: 'deposit_1.png', coin: 500},
						{price: 10, img: 'deposit_2.png', coin: 1200},
						{price: 10, img: 'deposit_3.png', coin: 1700},
						{price: 10, img: 'deposit_4.png', coin: 2500},
						{price: 10, img: 'deposit_5.png', coin: 3000},
						{price: 10, img: 'deposit_6.png', coin: 4000},
						{price: 10, img: 'deposit_7.png', coin: 5500},
						{price: 10, img: 'deposit_8.png', coin: 8000},
					],
				selectedPl: 0,
				paymentMethods: [
					{img: 'paypal.png', title: "PayPal", type: 1},
					{img: 'alipay.png', title: "Alipay", type: 2},
					{img: 'visa.png', title: "VISA", type: 3},
					{img: 'unitpay.png', title: "UnitPay", type: 4},
					{img: 'paymentwall.png', title: "PaymentWall", type: 5},

				],
				selectedPM: 0,
				paymentTitle: '',
				paymentPlan: 0,
				paymentTotal: 0,
				// FOR WIDGET
				widget: '',
				modalShow: false
			}
		},
		created(){
			this.setDate()
		},
		methods: {
			setDate() {
				this.paymentTitle = this.paymentMethods[this.selectedPM].title
				this.paymentPlan = this.plans[this.selectedPl].coin
				this.paymentTotal = this.plans[this.selectedPl].price
			},
			setPaymentMethod(idx) {
				this.selectedPM = idx
				this.paymentTitle = this.paymentMethods[this.selectedPM].title

			},
			setDepositItem(idx) {
				this.selectedPl = idx
				this.paymentPlan = this.plans[this.selectedPl].coin
				this.paymentTotal = this.plans[this.selectedPl].price
			},
			closeWidget() {
				this.widget = ''
			},
			async payNow() {
				console.log('payNow')
				if (this.selectedPM == 4) {
					console.log('paymentwall')
					let data = {}
					this.$api.request.getPaymentwallWidget(data, (res => {
						// if (res.status. == 200) {
						if (res.data.uri) {
						
							// console.log(res.data)
							// // this.modalShow = true
							// this.widget = res.data.widget
							window.open(res.data.uri, 'Dynamic Popup', "height=950,width=800,status=yes,toolbar=no,menubar=no,location=no,titlebar=no")
						} else {
							this.$toast.error('Server error.')
						}
							// if (res.data.user) {
							// 	this.$toast.show(`Successfully registered the username "${this.username}".`)
							// 	this.$store.dispatch('account/setAccount', res.data.user)
							// 	this.$store.commit('closeModal')
							// } else if (res.data.message) {
							// 	this.$toast.error(res.data.message)
							// }
					}), err =>{
						this.$toast.error('Server is disconnected.')
						console.log(err)
					})
// 					var str =`<!DOCTYPE html>
// <html>
// <body>

// <h1>My First Heading</h1>
// <p>My first paragraph.</p>

// </body>
// </html>`
				// let res = await axios.get('https://api.paymentwall.com/api/ps/?key=8c8962878af4e733f1a9e4b3e72a9b36&uid=mario12&widget=p1_1&sign_version=3&email=agetokens5555%40gmail.com&sign=b2c4bcae9fe3652152eaba32e4e56909ff8bdf92b3189cb6116755324923b30d')
				// // this.widget = res.data
				// // console.log(this.widget)
				// window.open('https://api.paymentwall.com/api/ps/?key=8c8962878af4e733f1a9e4b3e72a9b36&uid=848ea11edaa631a5cc37c6ed388c4041&widget=p1_1', 'Dynamic Popup', "height=950,width=800,status=yes,toolbar=no,menubar=no,location=no,titlebar=no")
				// var newWindow = window.open(res.data, 'Dynamic Popup', "height=950,width=800,status=yes,toolbar=no,menubar=no,location=no,titlebar=no")
				// newWindow.document.write(res.data);
				// newWindow.document.close();
				}
				return
				var payment = new UnitPay();
				payment.createWidget({
					publicKey: "236991-47030",
					sum: 1,
					account: "demo",
					domainName: "unitpay.ru",
					signature: "81d991a9811be811df0fe853268670242dc02fe61058d4269ddd1138f23c8dc7",
					desc: "Payment description",
					locale: "ru",
					// cashItems: [{"name":"Shaurma", "count": 1, "price":sum, "type":"commodity"}],
					// cashItems: [{"name":"Shaurma", "count": 1, "price":15, "type":"commodity"}],
					// customerEmail: 'younglady19931114@gmail.com'
				});
					payment.success(function (params) {
					console.log('Успешный платеж');
				});
					payment.error(function (message, params) {
					console.log(message);
				});
				return false;
			}
		}
	}
</script>
<style lang="scss">
	.payment-widget {
		opacity: 1;
		pointer-events: inherit;
		transition: 0.35s ease-in-out;
		max-height: 100vh;
		overflow-y: auto;
		// padding: 30px;
		// width: 100%;
		max-width: 820px;
		background-color: #fff;
		.me-button {
			width: 0px;
			margin-right: 15px;
			font-size: larger;
			color: #000!important;
		}
	}
</style>