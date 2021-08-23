
import ClassesUi from '../../../../components/Classes/ClassesUi'
import MainUi from '../../../../components/Main/MainUi'

export default function xkcdDetails(props) {
    const schoolId = props.id -1
    return (
        <MainUi>
            <ClassesUi schoolId={schoolId} />
        </MainUi>
    )
}

export async function getServerSideProps(context) {
    const num = context.query.id;
    return { props: { id: num } }
}