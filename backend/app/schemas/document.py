from pydantic import BaseModel, Field, field_validator
from typing import List, Optional

class DocumentFieldSchema(BaseModel):
    name: str
    value: str
    confidence: float = Field(ge=0, le=1)

    @field_validator('confidence')
    def validate_confidence(cls, v):
        if not 0 <= v <= 1:
            raise ValueError('confidence must be 0-1')
        return v

class DocumentExtractionSchema(BaseModel):
    document_type: str
    fields: List[DocumentFieldSchema]

    @field_validator('fields')
    def validate_fields(cls, v):
        if not v:
            raise ValueError('fields cannot be empty')
        names = [f.name for f in v]
        if len(names) != len(set(names)):
            raise ValueError('duplicate field names')
        return v
