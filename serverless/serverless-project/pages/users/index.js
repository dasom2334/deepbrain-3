import { Header, Layout, Modal, Pagination, AuthTable, Nav, AuthModal, MealCostModal, LoginModal,
	RegisterModal} from "@/components";

function Landing() {
	return (
		<Layout>
			<Nav />
			<Header />
			<AuthTable />
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