import { Header, Layout, Modal, Pagination, MealCostTable, Nav, AuthModal, MealCostModal, LoginModal,
	RegisterModal} from "@/components";

function Landing() {
	return (
		<Layout>
			<Nav />
			<Header />
			<MealCostTable />
			<Pagination />
			<Modal />
			<AuthModal />
			<MealCostModal />
			<LoginModal />
			<RegisterModal />
		</Layout>
	);
}

export default Landing;