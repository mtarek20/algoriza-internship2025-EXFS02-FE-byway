export default function CourseDetailsContentSection({ course }) {
  const courses = course.contents;
  return (
    <div className="">
      <h3 className="text-xl font-semibold text-g-900 mb-4">Content</h3>
      <div className="border border-graylight rounded-lg overflow-hidden bg-white">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-6 border-b border-graylight last:border-b-0"
          >
            {/* Course Title */}
            <h3 className="text-g-900 text-lg font-medium">{course.name}</h3>

            {/* Course Details */}
            <div className="flex space-x-4 text-sm text-g-700">
              <span>{course.lecturesNumber} Lectures</span>
              <span>{course.time} hour</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
