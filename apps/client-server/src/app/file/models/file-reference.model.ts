import { ParsedPath } from 'path';
import FileMetadata from './file-metadata.model';
import FileType from '../enums/file-type.enum';

export default interface FileReference {
  id: string;
  localPath: string;
  metadata: FileMetadata;
  path: ParsedPath;
  type: FileType;
}
