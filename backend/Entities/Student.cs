using backend.Types;

namespace backend.Entities;

public class Student(string name, StudentClassification classification)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = name;
    public StudentClassification Classification { get; set; } = classification;
}
